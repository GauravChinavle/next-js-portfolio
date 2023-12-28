import Image from 'next/image'
import { emailLogo, linkedinLogo } from '@/public/assets';
import Portfolio from "@/portfolio";

export default function Contact() {
    const { emailID } = Portfolio;
    return (
        <section id="contact">
            <p className="section__text__p1">Get in Touch</p>
            <h1 className="title">Contact Me</h1>
            <div className="contact-info-upper-container">
                <div className="contact-info-container">
                    <Image
                        src={emailLogo}
                        alt="Email icon"
                        className="icon contact-icon email-icon"
                        height={40}
                        width={40}
                    />
                    <p><a href={`mailto:${emailID}`}>{emailID}</a></p>
                </div>
                <div className="contact-info-container">
                    <Image
                        src={linkedinLogo}
                        alt="LinkedIn icon"
                        height={40}
                        width={30}
                        className="icon contact-icon"
                    />
                    <p><a href="https://in.linkedin.com/in/gauravchinawale">LinkedIn</a></p>
                </div>
            </div>
        </section>
    )
    }