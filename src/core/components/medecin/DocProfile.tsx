import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updateUser from "src/pages/patient/mutations/updateUser"
import updateMedecin from "src/pages/medecin/mutations/updateMedecin"
import React, { useState } from "react"
import PersonIcon from "@mui/icons-material/Person"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import MailIcon from "@mui/icons-material/Mail"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Man4Icon from "@mui/icons-material/Man4"
import HomeIcon from "@mui/icons-material/Home"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"

type DocProfileProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}

const DocProfile = ({ setCurrentUser, currentUser }: DocProfileProps) => {
  const [editing, setEditing] = useState(false)
  const [updateUserMutation] = useMutation(updateUser)
  const [updateMedecinMutation] = useMutation(updateMedecin)
  const birthdate = currentUser.birthDate
  const year = birthdate.getFullYear()
  const month = String(birthdate.getMonth() + 1).padStart(2, "0")
  const day = String(birthdate.getDate()).padStart(2, "0")
  const formattedDate = `${day}-${month}-${year}`
  const handleSubmit = async (values) => {
    if (currentUser) {
      try {
        await updateUserMutation({
          userId: currentUser.id,
          email: values.email,
          phone: values.phone,
          lastName: currentUser.lastName,
          firstName: currentUser.firstName,
          gender: currentUser.gender,
        })
        await updateMedecinMutation({
          userId: currentUser.id,
          rpps: currentUser.medecin.rpps,
          cabinet: values.cabinet,
          specialty: values.specialty,
        })

        setEditing(false)
      } catch (error) {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  if (!currentUser) {
    return null
  }

  return (
    <Card className="w-96 shadow-none bg-transparent absolute ml-40 mt-20 m5">
      <Typography className="text-[#172048] text-3xl mb-5 font-bold ">Mon compte</Typography>
      <List>
        <ListItem className="mb-4">
          <div className="flex items-center">
            <PersonIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            <div>
              <Typography className="text-[#979797] ">Nom</Typography>
              <Typography className="text-[#188CA5] text-2xl mb-5">
                {currentUser?.lastName.toUpperCase()} {currentUser?.firstName}
              </Typography>
            </div>
          </div>
        </ListItem>
        <ListItem className="mb-4">
          <div className="flex items-center">
            <CalendarMonthIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            <div>
              <Typography className="text-[#979797] ">Date de naissance</Typography>
              <Typography className="text-[#188CA5] text-2xl mb-5">{formattedDate}</Typography>
            </div>
          </div>
        </ListItem>

        <ListItem className="mb-1">
          <div className="flex items-center">
            <LocalHospitalIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            <div>
              <Typography className="text-[#979797]">RPPS</Typography>
              <Typography className="text-[#188CA5] text-2xl mb-5 ">
                {currentUser?.medecin.rpps}
              </Typography>
            </div>
          </div>
        </ListItem>
      </List>
      {editing ? (
        <Form
          initialValues={{
            phone: currentUser.phone,
            email: currentUser.email,
            cabinet: currentUser.medecin.cabinet,
            specialty: currentUser.medecin.specialty,
          }}
          onSubmit={handleSubmit}
          className="ml-2"
        >
          <div className="items-center justify-center">
            <div className="flex items-center">
              <LocalPhoneIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <LabeledTextField
                  style={{ height: "32px" }}
                  className="text-[#188CA5] text-2xl mb-5 "
                  name="phone"
                  label={<label className="text-[#979797]">Numéro de téléphone</label>}
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center">
              <MailIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <LabeledTextField
                  style={{ height: "32px" }}
                  className="text-[#188CA5] text-2xl mb-5 "
                  name="email"
                  label={<label className="text-[#979797]">Email</label>}
                  type="email"
                />
              </div>
            </div>
            <div className="flex items-center">
              <HomeIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <LabeledTextField
                  style={{ height: "32px" }}
                  className="text-[#188CA5] text-2xl mb-5 "
                  name="cabinet"
                  label={<label className="text-[#979797]">Cabinet</label>}
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center">
              <Man4Icon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <LabeledTextField
                  style={{ height: "32px" }}
                  className="text-[#188CA5] text-2xl mb-5 "
                  name="specialty"
                  label={<label className="text-[#979797]">Specialty</label>}
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-14">
            <button className="text-[#172048]" type="submit">
              Enregistrer
            </button>
            <button className="text-[#172048]" onClick={() => setEditing(false)}>
              Annuler
            </button>
          </div>
        </Form>
      ) : (
        <List>
          <ListItem className="mb-4">
            <div className="flex items-center">
              <LocalPhoneIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <Typography className="text-[#979797] ">Numéro de téléphone</Typography>
                <Typography className="text-[#188CA5] text-2xl mb-5 ">
                  {currentUser?.phone}
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem className="mb-4">
            <div className="flex items-center">
              <MailIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <Typography className="text-[#979797]  ">Email</Typography>
                <Typography className="text-[#188CA5] text-2xl mb-5  ">
                  {currentUser?.email}
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem className="mb-4">
            <div className="flex items-center">
              <HomeIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <Typography className="text-[#979797]  ">Cabinet</Typography>
                <Typography className="text-[#188CA5] text-2xl mb-5  ">
                  {currentUser?.medecin.cabinet}
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex items-center">
              <Man4Icon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <Typography className="text-[#979797]  ">Specialty</Typography>
                <Typography className="text-[#188CA5] text-2xl mb-5  ">
                  {currentUser?.medecin.specialty}
                </Typography>
              </div>
            </div>
          </ListItem>

          <button className="text-[#172048]" onClick={() => setEditing(true)}>
            Modifier
          </button>
        </List>
      )}
    </Card>
  )
}

export default DocProfile