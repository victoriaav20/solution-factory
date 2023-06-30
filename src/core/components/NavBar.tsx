import React from "react"
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"

export default function NavBar() {
  const [logoutMutation] = useMutation(logout)
  const [openNav, setOpenNav] = React.useState(false)
  const currentUser = useCurrentUser()
  console.log(currentUser)

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  let navList
  if (currentUser?.role == "MEDECIN" || currentUser?.role == "PHARMACIEN") {
    navList = (
      <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-[#CACBCB]">
        <Typography as="li" variant="small" className="p-1 font-normal text-base mr-12">
          <a href="#" className="flex items-center ">
            Mes patients
          </a>
        </Typography>

        <Typography as="li" variant="small" className="p-1 font-normal text-base mr-12">
          <a href="#" className="flex items-center ">
            Mon compte
          </a>
        </Typography>
      </ul>
    )
  } else {
    navList = (
      <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-[#CACBCB]">
        <Link href={Routes.Ordonnances()}>
          <Typography as="li" variant="small" className="p-1 font-normal text-base mr-12">
            <div className="flex items-center ">Mes ordonnances</div>
          </Typography>
        </Link>
        <Link href={Routes.ProfilPatient()}>
          <Typography as="li" variant="small" className="p-1 font-normal text-base mr-12">
            <div className="flex items-center ">Mon compte</div>
          </Typography>
        </Link>
      </ul>
    )
  }

  let buttons
  if (currentUser == null) {
    buttons = (
      <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
        <Link href="">
          <Button
            variant="gradient"
            size="sm"
            className="drop-shadow-lg hidden lg:inline-block bg-transparent border-2 border-[#188CA5] rounded-full text-[#188CA5] font-Poppins text-base"
          >
            <span>Vous êtes médecin ou pharmacien ?</span>
          </Button>
        </Link>

        <Link href={Routes.LoginPage()}>
          <Button
            variant="gradient"
            size="sm"
            className="drop-shadow-lg hidden lg:inline-block bg-[#188CA5] rounded-full text-white font-Poppins text-base"
          >
            <span>Se connecter</span>
          </Button>
        </Link>
      </ul>
    )
  } else {
    buttons = (
      <Button
        onClick={async () => {
          await logoutMutation()
        }}
        variant="gradient"
        size="sm"
        className="drop-shadow-lg hidden lg:inline-block bg-[#188CA5] rounded-full text-white font-Poppins text-base"
      >
        <span>Deconnexion</span>
      </Button>
    )
  }
  return (
    <div>
      <Navbar className="sticky inset-0 z-10 h-max  rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-[#F4FEFF] border-b-0">
        <div className="flex gap-x-10 items-center justify-between ">
          <Typography as="a" href="#" className="mx-8 cursor-pointer py-1.5 font-medium text-base">
            Material Tailwind
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="mr-4 hidden lg:block">{buttons}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  )
}
