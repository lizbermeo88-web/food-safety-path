import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { modules, PASS_MARK } from "@/data/course";

export type ModuleProgress = {
  module_id: number;
  best_score: number;
  total_questions: number;
  best_percentage: number;
  passed: boolean;
  attempts: number;
  last_section: number;
};

export function useProgress(userId: string | undefined) {
  return useQuery({
    queryKey: ["progress", userId],
    enabled: !!userId,
    queryFn: async (): Promise<ModuleProgress[]> => {
      const { data, error } = await supabase
        .from("module_progress")
        .select("module_id, best_score, total_questions, best_percentage, passed, attempts, last_section")
        .order("module_id");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCertificate(userId: string | undefined) {
  return useQuery({
    queryKey: ["certificate", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("id, full_name, code, average_percentage, issued_at")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useSaveAttempt(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { moduleId: number; score: number; total: number }) => {
      if (!userId) throw new Error("Sesión no disponible");
      const percentage = Math.round((input.score / input.total) * 100);

      const { data: existing } = await supabase
        .from("module_progress")
        .select("id, best_score, best_percentage, attempts, passed")
        .eq("module_id", input.moduleId)
        .maybeSingle();

      if (existing) {
        const better = percentage > existing.best_percentage;
        const { error } = await supabase
          .from("module_progress")
          .update({
            best_score: better ? input.score : existing.best_score,
            best_percentage: better ? percentage : existing.best_percentage,
            total_questions: input.total,
            passed: existing.passed || percentage >= PASS_MARK,
            attempts: existing.attempts + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("module_progress").insert({
          user_id: userId,
          module_id: input.moduleId,
          best_score: input.score,
          best_percentage: percentage,
          total_questions: input.total,
          passed: percentage >= PASS_MARK,
          attempts: 1,
        });
        if (error) throw error;
      }

      return { percentage, passed: percentage >= PASS_MARK };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["progress", userId] });
    },
  });
}

export function useSaveSection(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { moduleId: number; section: number }) => {
      if (!userId) return;
      const { data: existing } = await supabase
        .from("module_progress")
        .select("id, last_section")
        .eq("module_id", input.moduleId)
        .maybeSingle();

      if (existing) {
        if (input.section <= existing.last_section) return;
        await supabase
          .from("module_progress")
          .update({ last_section: input.section, updated_at: new Date().toISOString() })
          .eq("id", existing.id);
      } else {
        await supabase.from("module_progress").insert({
          user_id: userId,
          module_id: input.moduleId,
          last_section: input.section,
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["progress", userId] });
    },
  });
}

export function useIssueCertificate(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { fullName: string; average: number }) => {
      if (!userId) throw new Error("Sesión no disponible");
      const code = `AEHAC-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;
      const { data, error } = await supabase
        .from("certificates")
        .insert({
          user_id: userId,
          full_name: input.fullName,
          average_percentage: input.average,
          code,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["certificate", userId] });
    },
  });
}

export function buildState(progress: ModuleProgress[] | undefined) {
  const byId = new Map((progress ?? []).map((p) => [p.module_id, p]));
  const items = modules.map((m, index) => {
    const p = byId.get(m.id);
    const previous = index === 0 ? null : byId.get(modules[index - 1]!.id);
    const unlocked = index === 0 || !!previous?.passed;
    return {
      module: m,
      progress: p,
      unlocked,
      passed: !!p?.passed,
      percentage: p?.best_percentage ?? 0,
    };
  });
  const passedCount = items.filter((i) => i.passed).length;
  const globalPercentage = Math.round((passedCount / modules.length) * 100);
  const average =
    passedCount === modules.length
      ? Math.round(items.reduce((acc, i) => acc + i.percentage, 0) / modules.length)
      : 0;
  const nextModule = items.find((i) => i.unlocked && !i.passed)?.module ?? items[items.length - 1]!.module;
  return { items, passedCount, globalPercentage, average, nextModule, allPassed: passedCount === modules.length };
}
