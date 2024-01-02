import Image from 'next/image'
import { githubLogo, linkedinLogo, profilePic1 } from '@/public/assets';
import Portfolio from "@/portfolio";
import { getYears } from "@/utils";

export default function Profile() {
    const { name, designation, workingStartDate, linkedinLink, githubLink } = Portfolio;
    return (
        <section id="profile">
            <div className="section__pic-container">
                <Image 
                    src={profilePic1} 
                    alt="My profile picture" 
                    height={300}
                    width={300}
                    priority={true}
                />
            </div>
            <div className="section__text">
                <p className="section__text__p1">Hello, I&apos;m</p>
                <h1 className="title">{name}</h1>
                <p className="section__text__p2">{designation}</p>
                <p className="section__text__p3">{`with ${getYears(workingStartDate)} years of experience`}</p>
                <div className="btn-container">
                    <button
                        className="btn btn-color-2"
                        onClick={() => window.open('/assets/resume.pdf')}
                    >
                        Download CV
                    </button>
                    <button className="btn btn-color-1" onClick={() => location.href = './contact'}>
                        Contact Info
                    </button>
                </div>
                <div id="socials-container">
                    <Image
                        src={linkedinLogo}
                        alt="My LinkedIn profile"
                        className="icon"
                        height= {30}
                        width= {30}
                        onClick={() => location.href = linkedinLink}
                    />
                    <Image
                        src={githubLogo}
                        alt="My Github profile"
                        className="icon"
                        height= {30}
                        width= {30}
                        onClick={() => location.href = githubLink}
                    />
                </div>
            </div>
        </section>
    )
}