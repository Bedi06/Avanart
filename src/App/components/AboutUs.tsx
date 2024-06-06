import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="absolute inset-0 flex justify-center items-center"></div>
      <h1 className="text-3xl  text-pink-500 font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our avatar generation website! This project was initiated as
        part of our learning journey in software development at CodeYourFuture.
      </p>
      <p className="text-md mb-2">
        The primary objective of this website is to provide a platform for
        individuals who cannot use their original pictures to generate avatars.
        Throughout this project, We have been utilizing TypeScript to ensure
        cleaner and more understandable code, facilitating easier maintenance
        and scalability.
      </p>
      <p className="text-md mb-2 ">
        Initially, we worked on refactoring the existing codebase, which was
        written in legacy code. This process allowed us to gain in-depth
        understanding of the project, fix bugs, and apply necessary updates.
        Now, we are actively working on building new features to enhance the
        website and achieve its objectives.
      </p>
      <p className="text-md mb-2">
        This experience has been invaluable in teaching us how to approach new
        projects written by others, identify and resolve issues effectively, and
        seamlessly integrate new features into existing codebases.
      </p>
    </div>
  );
};

export default AboutUs;
