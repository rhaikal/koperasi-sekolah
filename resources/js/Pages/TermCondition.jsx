import HomeLayout from '@/Layouts/HomeLayout'
import { Head } from '@inertiajs/inertia-react';
import "../../css/list.css";

const Paragraf = ({children, className} ) => {
    return (
        <p className={`text-md font-medium text-gray-600/90 my-3 ${className}`}>{children}</p>
    )
}

const TermCondition = () => {
    return (
        <>
            <Head title='Term & Condition' />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg p-6">
                        <h1 className="mb-4 text-2xl font-bold text-gray-700">Term & Condition</h1>
                        <Paragraf>
                            These Terms and Conditions are a legally binding agreement between you and us governing your use of the Kopers website and services.
                        </Paragraf>
                        <Paragraf>
                            By accessing or using the Kopers website and services, you agree to be bound by the terms and conditions of this Agreement. If you do not agree with these terms, please do not access or use our website or services.
                        </Paragraf>
                        <Paragraf>
                            <ol className='list-custom list-inside'>
                                <li className="list-custom">
                                    Use of Services
                                    <ol className='list-custom pl-5 list-inside'>
                                        <li className="list-custom">The Kopers website and services are provided to you solely for your personal use.</li>
                                        <li className="list-custom">You may not use the Kopers website and services for any illegal or unauthorized purpose, including but not limited to infringement of intellectual property rights, unauthorized access, or interference with the operation of the website or services.</li>
                                        <li className="list-custom">You may not use the Kopers website and services to distribute or transmit any harmful, obscene, or offensive material.</li>
                                    </ol>
                                </li>
                                <li className="list-custom">
                                    Account Registration
                                    <ol className='list-custom pl-5 list-inside'>
                                        <li className="list-custom">To access certain features of the Kopers website and services, you may be required to create an account and provide certain personal information.</li>
                                        <li className="list-custom">You agree to provide accurate and complete information when creating an account and to keep your account information up to date.</li>
                                        <li className="list-custom">You are responsible for maintaining the confidentiality of your account login information and for all activities that occur under your account.</li>
                                        <li className="list-custom">The School reserves the right to terminate your account or refuse service to anyone for any reason at any time.</li>
                                    </ol>
                                </li>
                                <li className="list-custom">
                                    Disclaimer of Warranties
                                    <ol className='list-custom pl-5 list-inside'>
                                        <li className="list-custom">The Kopers website and services are provided “as is” and without warranty of any kind, whether express or implied.</li>
                                        <li className="list-custom">The School does not warrant that the website or services will be error-free, uninterrupted, or free from harmful components.</li>
                                    </ol>
                                </li>
                                <li className="list-custom">
                                Limitation of Liability
                                <ol className='list-custom pl-5 list-inside'>
                                        <li className="list-custom">In no event shall the School be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website or services.</li>
                                        <li className="list-custom">The School shall not be liable for any damages or losses resulting from the unauthorized access to or alteration of your transmissions or data.</li>
                                        <li className="list-custom">The School shall not be liable for any damages or losses resulting from the use of any third-party products or services.</li>
                                </ol>
                                </li>
                                <li className="list-custom">
                                    Indemnification
                                    <ol className='list-custom pl-5 list-inside'>
                                        <li className="list-custom">You agree to indemnify and hold harmless the School, its affiliates, officers, directors, employees, and agents from any and all claims, damages, liabilities, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the website or services, or any breach of this Agreement.</li>
                                    </ol>
                                </li>
                                <li className="list-custom">
                                    Termination
                                    <ol className='list-custom pl-5 list-inside'>
                                        <li className="list-custom">The School may terminate this Agreement and your access to the website or services at any time and for any reason.</li>
                                        <li className="list-custom">Upon termination of this Agreement, you must immediately cease all use of the website and services.</li>
                                    </ol>
                                </li>
                            </ol>
                        </Paragraf>
                    </div>
                </div>
            </div>
        </>
    );
}

TermCondition.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} children={page} />

export default TermCondition;
