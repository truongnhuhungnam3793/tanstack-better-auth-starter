import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { Link, useNavigate } from '@tanstack/react-router'

const Header = () => {
  const { data: session } = authClient.useSession()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/login' })
        },
      },
    })
  }

  return (
    <header>
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </h1>

        <nav className="flex gap-4">
          {session ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
export default Header
