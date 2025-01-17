import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSetting";
export function UseSettings() {
  const {
    data: settings,
    isLoading,
    error
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings
  });

  return { settings, isLoading, error };
}
