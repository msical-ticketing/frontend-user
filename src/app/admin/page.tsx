'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useApprove } from '../../hooks/useApprove'
import SuccessModal from '@/components/modals/Success'
import ProcessingModal from '@/components/modals/Processing'
import { ApproveButton } from '../../components/ApproveButton'
import BlockPlaceholder from '../../components/BlockPlaceholder'
import { useGetAllOrganizers } from '../../hooks/useGetAllOrganizers'
import { useAccount, usePublicClient, useWebSocketPublicClient } from 'wagmi'

const AdminPage = () => {
	const { address } = useAccount()
	const router = useRouter()

	useEffect(() => {
		if (address != process.env.NEXT_PUBLIC_OWNER) router.replace('/')
	}, [address, router])

	const { write, isLoading, isSuccess, data, status } = useApprove()

	const { isFetching, allOrganizers } = useGetAllOrganizers()

	if (isFetching) {
		return <BlockPlaceholder />
	}

	const onClick = (organizer: any) => {
		write({ args: [organizer] })
	}

	const organizers: any = allOrganizers

	console.log('organizers', organizers)

	if (organizers.length)
		return (
			<>
				<div className="grid gap-6">
					{organizers.map((organizer: any, index: number) => (
						<Card key={index}>
							<div className="flex justify-between items-center px-4 py-2">
								{organizer}
								<Button onClick={() => onClick(organizer)}>Approve</Button>
							</div>
						</Card>
					))}
				</div>
				{isLoading && <ProcessingModal open={isLoading} />}
				{isSuccess && <SuccessModal open={isSuccess} txHash={data?.hash} path="/event/manage" />}
			</>
		)
}

export default AdminPage
