import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <img alt="" className="mb-5 w-52" src="https://links.papareact.com/9xl" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-full bg-[#18D860] p-5  text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default Login
