import { getProviders } from "next-auth/react"
import SignInComponent from "../../../Components/SingInComponent"

async function SignInPage() {
    const providers = await getProviders()
    return (
        <div>
            <SignInComponent providers={providers} />
        </div>
    )
}

export default SignInPage