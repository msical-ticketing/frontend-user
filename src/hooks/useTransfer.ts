import msicalABI from '@/assets/Msical1155.json'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

export const useTransfer = () => {
	const { data, write, status } = useContractWrite({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_COLLECTION}`,
		abi: msicalABI.abi,
		functionName: 'burn',
	})

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	})

	return { write, isLoading, isSuccess, data, status }
}
