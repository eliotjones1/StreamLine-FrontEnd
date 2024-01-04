import { useState, useEffect } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { CogIcon, UserIcon, BuildingLibraryIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Footer } from '/src/modules/common/components';
import InitialSearch from 'src/modules/media/pages/initial/index.jsx';
import InitAddServices  from 'src/modules/media/pages/initial/components/AddServices/index.jsx';
import Logo from '../../../../assets/images/StreamLine_Transparent_Logo.png';
import { useNavigate } from 'react-router-dom';
import { StreamLineAxios } from '../../../../api/axios.config.js';
import { defaultToast } from 'api/toast.config';
import { toast } from 'react-toastify';

export default function CreateAccount() {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        // Add other form fields here
    });
    const [tosChecked, setTosChecked] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("createAccountData"));
        if (savedData) {
            setFormData(savedData);
            setTosChecked(savedData.tosChecked || false);
        }
    }, []);

    const handleNext = () => {
        if (!isLastStep) {
            setActiveStep((cur) => cur + 1);
            saveDataToLocalStorage();
        }
    };

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    
    const saveDataToLocalStorage = () => {
        localStorage.setItem("createAccountData", JSON.stringify(formData));
    };

    const handleSubmit = async () => {
        try {
            // Construct your payload here, if needed
            const payload = {
                tosAccepted: tosChecked,
                // Other payload details
            };

            const response = await StreamLineAxios.post('/settings/tosCompliance/update/', payload);

            if (response.status === 200) {
                // Navigate to user dashboard upon successful POST
                try {
                    const response = await StreamLineAxios.post('/settings/user-subscriptions/generateBundle/');
                    if (response.status === 200) {
                        nav('/user-dash');
                    } else {
                        toast.error(
                            `Bundlge generation failed, please try again later`,
                            defaultToast,
                             );
                    }
                } catch (error) {
                    toast.error(
                        `Bundle generation failed, please try again later`,
                        defaultToast,
                        );
                }
                
            } else {
                // Handle other HTTP responses accordingly
                toast.error(
                    `Accepcance of TOS failed, please try again later`,
                    defaultToast,
                    );
            }
        } catch (error) {
            toast.error(
                `Acceptance of TOS failed, please try again later`,
                defaultToast,
                );
            // Handle network or other errors here
        }
    };

    const handleTosChange = (e) => {
        setTosChecked(e.target.checked);
        setFormData({ ...formData, tosChecked: e.target.checked });
    };

    return (
        <div className="w-full px-24 py-4">
            {/* Step contents */}
            {activeStep === 0 && (
                <div style={{ textAlign: "center" }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '40px' }}>
                            <img src={Logo} alt='StreamLine' style={{ marginRight: '10px', width: '5%' }} />
                            <h1 className="text-center text-6xl mx-auto text-sky-500">Welcome!</h1>
                        </div>
                        <p className="text-2xl" style={{ marginTop: '40px' }}>
                            Welcome to StreamLine! We are so glad you&apos;ve decided to join us on this journey. You&apos;re here because,
                            like us, you are tired of having to keep track of where all of your favorite content lives. We&apos;re here because
                            we want to help make streaming an easier, more seamless, experience for everyone, and we can&apos;t wait to show you
                            what we can do! 
                                    </p>
                                    <p className="text-2xl" style={{ marginTop: '20px', marginBottom: '20px'}}>
                                        Before you get started, we just have a few bits of information we need from you. In order to get started,
                                        we need to know what&apos;s on your watchlist, and what you currently have access to. This way, we can
                                        help guide your streaming subscriptions in such a way that maximizes content, while making sure you aren&apos;t
                                        paying for anything you don&apos;t need. 
                                    </p>
                        <p className="text-2xl" style={{ marginTop: '20px', marginBottom: '40px'}}>
                            The next section will allow you to search for shows or movies you want to watch, and add them to your watchlist. Don&apos;t
                            worry, once you click the plus sign the content will automatically be added! Then, we just need some quick personal information
                            from you, and for you to agree to our Terms of Service, and then we can get going!
                        </p>
                                </div>
                            </div>
                        )}
            {activeStep === 1 && <InitialSearch />}
            {activeStep === 2 && <InitAddServices />}
            {activeStep === 3 && (
                <div className="terms-of-service" style={{ textAlign: 'center' }}>
    <div className="scrollable-tos" style={{ marginBottom: '20px' }}>
        {/* Your Terms of Service text here */}
        <p> TEMP </p>
    </div>
    <label style={{ display: 'block', marginBottom: '20px' }}>
        <input type="checkbox" checked={tosChecked} onChange={handleTosChange} />
        I agree to the Terms of Service
    </label>
    <Button onClick={handleSubmit} disabled={!tosChecked}>
        Submit
    </Button>
</div>

                )}

            {/* Stepper */}
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                >
                {/* Step 1 */}
                <Step onClick={() => setActiveStep(0)}>
                    <InformationCircleIcon className="h-5 w-5" />
                    {/* ... */}
                </Step>

                {/* Step 2 */}
                <Step onClick={() => setActiveStep(1)}>
                    <UserIcon className="h-5 w-5" />
                    {/* ... */}
                </Step>

                {/* Step 3 */}
                <Step onClick={() => setActiveStep(2)}>
                    <CogIcon className="h-5 w-5" />
                    {/* ... */}
                </Step>
                
                <Step onClick={() => setActiveStep(3)}>
                    <BuildingLibraryIcon className="h-5 w-5" />
                    {/* ... */}
                </Step>
                
            </Stepper>
            <div className="mt-32 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                    Prev
                </Button>
                {activeStep !== 3 && (
                    <Button onClick={handleNext} disabled={isLastStep}>
                        Next
                    </Button>
                    )}
            </div>
            <Footer/>
        </div>
        );
}
