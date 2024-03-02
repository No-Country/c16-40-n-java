import DonationContainer from '@/components/project/donation/donationContainer';

const DonationPage = ({ params }: { params: { id: string } }) => {
  return <DonationContainer projectId={params.id} />;
};
export default DonationPage;
