import api from "@/lib/axios";
import { DescriptionFormValues } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export function useCreateDescription(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async(data: DescriptionFormValues) => {
            const res = await api.post("/description", data)

            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["product"]})
        }
    })
}