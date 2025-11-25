import Link from 'next/link'
import { GrOptimize, GrFingerPrint } from 'react-icons/gr'
import { MdMoneyOff } from 'react-icons/md'
import { DiResponsive } from 'react-icons/di'
import { FcDataBackup, FcUpload } from 'react-icons/fc'
import Image from 'next/image'
import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-7">
              <div>
                <Link
                  href="/"
                  className="flex items-center px-2 py-4 text-gray-700 hover:text-gray-900"
                >
                  <Image
                    src="/assets/resume-example.jpg"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
              <div className="hidden items-center space-x-1 md:flex">
                <Link
                  href="/builder"
                  className="px-2 py-4 text-gray-700 hover:text-gray-900"
                >
                  Builder
                </Link>
                <Link
                  href="/templates"
                  className="px-2 py-4 text-gray-700 hover:text-gray-900"
                >
                  Templates
                </Link>
                <Link
                  href="/examples"
                  className="px-2 py-4 text-gray-700 hover:text-gray-900"
                >
                  Examples
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="mb-2 text-6xl font-bold text-gray-800">
              Get hired with an ATS <br />
              <span className="text-red">
                <Typewriter
                  words={['optimized', 'Perfect', 'Professional']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              <br />
              Resume.
            </h1>
            <p className="mb-4 text-gray-600">
              ATSResume is an innovative resume builder that helps job seekers
              create a professional and optimized resume for applicant tracking
              systems. Our platform uses cutting-edge technology to analyze and
              optimize your resume for maximum visibility and success. Say
              goodbye to manual formatting frustration and wasted time, and
              Create your winning resume with ATSResume today and get noticed by
              employers.
            </p>
            <Link
              href="/builder"
              className="inline-block transform cursor-pointer rounded-lg bg-red-800 px-6 py-3 text-lg font-bold text-red-800 transition duration-200 hover:-translate-y-1 hover:bg-red-800 hover:shadow-lg"
            >
              Make My Resume
            </Link>
          </div>
        </div>
      </section>
      <About />
    </>
  )
}

const About = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-12">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">Features</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex rounded-lg bg-red-800 p-4 shadow-lg">
              <GrOptimize className="mr-4 text-8xl text-gray-800" />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  ATS-optimized
                </h1>
                <p className="text-gray-600">
                  Our platform uses cutting-edge technology to analyze and
                  optimize your resume for maximum visibility and success with
                  applicant tracking systems.
                </p>
              </div>
            </div>
            <div className="flex rounded-lg bg-red-800 p-4 shadow-lg">
              <GrFingerPrint className="mr-4 text-8xl text-gray-800" />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  Easy to use
                </h1>
                <p className="text-gray-600">
                  Our user-friendly interface makes it easy to build a
                  professional, ATS-friendly resume in minutes. No more
                  frustration or wasted time spent on manual formatting.
                </p>
              </div>
            </div>
            <div className="flex rounded-lg bg-red-800 p-4 shadow-lg">
              <MdMoneyOff className="mr-4 text-8xl text-gray-800" />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">Free</h1>
                <p className="text-gray-600">
                  Our platform is completely free to use. No hidden fees or
                  subscriptions. Just create an account and start building your
                  dream resume today!
                </p>
              </div>
            </div>
            <div className="flex rounded-lg bg-red-800 p-4 shadow-lg">
              <DiResponsive className="mr-4 text-8xl text-gray-800" />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  Mobile-friendly
                </h1>
                <p className="text-gray-600">
                  Our platform is fully responsive and mobile-friendly, so you
                  can build your resume on the go. No more waiting until you get
                  home to work on your resume.
                </p>
              </div>
            </div>
            <div className="flex rounded-lg bg-red-800 p-4 shadow-lg">
              <FcDataBackup className="mr-4 text-8xl text-gray-800" />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  Download Backup Data
                </h1>
                <p className="text-gray-600">
                  Download your resume data in JSON format and store it in a
                  safe place. You can use this data to restore your resume in
                  the future.
                </p>
              </div>
            </div>
            <div className="flex rounded-lg bg-red-800 p-4 shadow-lg">
              <FcUpload className="mr-4 text-8xl text-gray-800" />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  Upload Backup Data
                </h1>
                <p className="text-gray-600">
                  Upload your resume data in JSON format to restore your resume.
                  This is useful if you accidentally delete your resume or if
                  you want to switch devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
