"use client";
import React from "react";
import Register from "@/app/component/Register/page";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const page = ({ children }) => {
  const router = useRouter("");
  return (
    <>
      {localStorage.getItem("user") ? (
        <>{children}</>
      ) : (
        <>
          {children}
          {router.replace("/Login")}
        </>
      )}
    </>
  );
};

export default page;
