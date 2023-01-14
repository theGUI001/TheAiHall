import SignInComponent from "../../../Components/SingInComponent/"

async function SignInPage() {
    return (
        <main>
            <h1 className="text-red-600 text-center absolute left-0 right-0 top-36">Invalid Credentials</h1>
            <SignInComponent />
        </main>
    )
}

export default SignInPage