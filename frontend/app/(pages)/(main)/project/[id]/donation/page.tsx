import DonationContainer from '@/components/donation/donationContainer';

const DonationPage = ({ params }: { params: { id: string } }) => {
  return <DonationContainer projectId={params.id} />;
};
export default DonationPage;
