import Container from '@/components/common/Container';
import { getSinglePage } from '@/lib/fetchData';

export const metadata = {
    title: 'ব্যবহারের শর্তাবলী | বাংলা স্টার নিউজ',
    description: 'বাংলা স্টার নিউজ এর ব্যবহারের শর্তাবলী',
};

export default async function TermsOfUsePage() {

    const termsData = await getSinglePage("terms");
    // console.log("terms", termsData)


    return (
        <main className="bg-[#eff3f6] py-10 md:py-16 min-h-[60vh]">
            <Container>
                <div className="bg-white p-6 md:p-10 rounded shadow-sm">


                    <div
                        className="prose max-w-none text-gray-700 leading-relaxed text-base md:text-lg"
                        dangerouslySetInnerHTML={{ __html: termsData?.description }}
                    />
                </div>
            </Container>
        </main>
    );
}
