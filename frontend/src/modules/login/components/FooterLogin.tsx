import Link from "next/link";

export default function FooterLogin() {
  return (
    <footer className="mt-10 text-center">
      <p className="text-sm text-slate-500">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary-default font-bold hover:underline">
          Sign up
        </Link>
      </p>
    </footer>
  );
}
