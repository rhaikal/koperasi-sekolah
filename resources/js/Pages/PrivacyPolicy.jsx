import HomeLayout from '@/Layouts/HomeLayout'
import { Head } from '@inertiajs/inertia-react';

const Paragraf = ({children, className} ) => {
    return (
        <p className={`text-md font-medium text-gray-600/90 my-3 ${className}`}>{children}</p>
    )
}

const PrivacyPolicy = () => {
    return (
        <>
            <Head title='Privacy Policy' />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg p-6">
                        <h1 className="mb-4 text-2xl font-bold text-gray-700">Privacy Policy</h1>
                        <h4 className="text-xl font-semibold text-gray-600">Effective date: -</h4>
                        <Paragraf>
                            we operates Kopers Service.
                            This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.
                        </Paragraf>
                        <Paragraf>
                            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                        </Paragraf>
                        <Paragraf>
                            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                        </Paragraf>
                        <Paragraf>
                            <b className="text-lg">Definitions</b>
                            <ul className="list-disc mx-3">
                                <li className="ml-3">Service: Service is the Kopers website operated by SMK Negeri 2 Surabaya.</li>
                                <li className="ml-3">Personal Data: Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</li>
                                <li className="ml-3">Usage Data: Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, how many order you been made).</li>
                                <li className="ml-3">Cookies: Cookies are small pieces of data stored on your device (computer or mobile device).</li>
                                <li className="ml-3">Data Controller: Data Controller means the natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal information are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</li>
                                <li className="ml-3">Data Processor (or Service Providers): Data Processor (or Service Provider) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</li>
                                <li className="ml-3">Data Processor (or Service Providers): Data Processor (or Service Provider) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</li>
                                <li className="ml-3">Data Subject: Data Subject is any living individual who is the subject of Personal Data.</li>
                            </ul>
                        </Paragraf>
                        <Paragraf>
                            <b className="text-lg">Information Collection and Use</b> <br />
                            We collect several different types of information for various purposes to provide and improve our Service to you.
                        </Paragraf>
                        <Paragraf>
                            <b className="text-lg">Types of Data Collected</b>
                        </Paragraf>
                        <p className="mx-3">
                            <Paragraf>
                                <b className="text-[1rem] font-bold">Personal Data</b> <br />
                                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                                <ul className="list-disc">
                                    <li className="ml-6">Email Address</li>
                                    <li className="ml-6">Full Name</li>
                                    <li className="ml-6">Phone Number</li>
                                    <li className="ml-6">Cookies and Usage Data</li>
                                </ul>
                            </Paragraf>
                            <Paragraf>
                                <b className="text-[1rem] font-bold">Usage Data</b> <br />
                                We may also collect information on how the Service is accessed and used ("Usage Data").
                            </Paragraf>
                            <Paragraf>
                                <b className="text-[1rem] font-bold">Tracking & Cookies Data</b> <br />
                                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                            </Paragraf>
                            <Paragraf>
                                Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                            </Paragraf>
                            <Paragraf>
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                            </Paragraf>
                            <Paragraf>
                                Examples of Cookies we use:
                                <ul className="list-disc">
                                    <li className="ml-6"><b className="font-semibold">Session Cookies</b>. We use Session Cookies to operate our Service.</li>
                                    <li className="ml-6"><b className="font-semibold">Security Cookies</b> We use Security Cookies to our website security controls and checks.</li>
                                </ul>
                            </Paragraf>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

PrivacyPolicy.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} children={page} />

export default PrivacyPolicy;
