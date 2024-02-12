import Link from "next/link";
import router from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getProjects } from "@/api";
import Layout from "@/components/Layout";


export default function Splash() {
    return (
    <div>
        <Layout color="[#FF242F]" top="">
            <div className="py-80 text-center text-white">
                &copy; 2024 Current Services &amp; All Parties Mentioned Herein
            </div>
        </Layout>
    </div>
)}