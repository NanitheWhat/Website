import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  return (
    <>
      <div className="mt-0 justify-center text-center item-center flex laptop:mt-20 p-2 laptop:p-0">
        <div>
          <h1 className="text-2xltext-center text-bold">Contact.</h1>
          <div className="mt-10">
            
            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
