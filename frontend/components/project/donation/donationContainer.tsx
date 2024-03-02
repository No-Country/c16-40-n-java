import DonationForm from './donationForm';

interface Props {
  projectId: string;
}

const DonationContainer = ({ projectId }: Props) => {
  return (
    <section className="flex flex-col items-center h-full">
      <div className="bg-white m-auto w-[95%] lg:w-1/2 rounded-lg px-5 py-10 mt-28 lg:mt-36 mb-10 flex flex-col lg:flex-row justify-between gap-5">
        <h1>{projectId}</h1>
        <DonationForm />
      </div>
    </section>
  );
};
export default DonationContainer;
