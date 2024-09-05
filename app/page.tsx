import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div>
                <Link href={"/auth/login"}> Click me to go to login</Link>
            </div>
        </div>
    );
}
