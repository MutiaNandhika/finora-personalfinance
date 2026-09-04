import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";
import { Profile } from "@/types";
import { toast } from "sonner";

export const PROFILE_KEY = ["profile"];

export function useProfile() {
  const { user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...PROFILE_KEY, user?.id],
    queryFn: () => getProfile(user?.id),
    enabled: !!user?.id,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<Profile>) => {
      if (!user?.id) throw new Error("Not authenticated");
      return updateProfile(user.id, payload);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
      await refreshProfile();
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  return {
    ...query,
    profile: query.data,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
