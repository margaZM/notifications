import Link from "next/link";

export default function FooterRegister() {
  return (
    <footer className="mt-8 text-center">
      <p className="text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-default font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </footer>
  );
}
