import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  AppShell,
  Navbar,
  MediaQuery,
  useMantineTheme,
  Header,
  Burger,
  Title,
  NavLink,
  Grid,
  Avatar,
  Menu,
  Button,
  Anchor,
  Divider,
  Flex,
} from '@mantine/core'
import {
  IconHanger,
  IconShirt,
  IconLogout,
  IconAdjustmentsFilled,
  IconHelp,
} from '@tabler/icons-react'
import Wardrobe from './components/Wardrobe'
import Outfits from './components/Outfits'

const navLinks = [
  { icon: IconHanger, label: 'Wardrobe', target: 'wardrobe' },
  {
    icon: IconShirt,
    label: 'Outfits',
    target: 'outfits',
  },
]

function App() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [active, setActive] = useState(window.location.href.split('/')[3])
  const navigate = useNavigate()

  function handleNavClick(target) {
    setActive(target)
    navigate(target)
    setOpened(false)
  }
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt="md">
            {navLinks.map((link, index) => {
              return (
                <NavLink
                  key={link.label}
                  to={link.target}
                  active={link.target === active}
                  icon={<link.icon size="1rem" stroke={1.5} />}
                  onClick={() => handleNavClick(link.target)}
                  label={link.label}
                />
              )
            })}
          </Navbar.Section>
          <Navbar.Section>
            <Grid justify="flex-start" align="center" my={0}>
              <Menu shadow="md" width={200}>
                <Grid.Col span="content">
                  <Avatar radius="xl" m="10px" />
                </Grid.Col>
                <Grid.Col span="content">
                  <Menu.Target>
                    <Button variant="subtle">Account</Button>
                  </Menu.Target>
                </Grid.Col>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconAdjustmentsFilled size={14} />}>
                    Account Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconHelp size={14} />}>
                    Help & Contact
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item color="red" icon={<IconLogout size={14} />}>
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Grid>
            <Divider />
            <Grid mx="sm" my="sm">
              <Grid.Col span="content">
                <Anchor size="xs" align="center">
                  About
                </Anchor>
              </Grid.Col>
              <Grid.Col span="content">
                <Anchor size="xs" align="center">
                  Contact
                </Anchor>
              </Grid.Col>
              <Grid.Col span="content">
                <Anchor size="xs" align="center">
                  Privacy
                </Anchor>
              </Grid.Col>
            </Grid>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            padding: '0 1rem',
          }}
        >
          <Title order={1}>Droble</Title>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
        </Header>
      }
      footer={
        <footer>
          <Flex className="footer-content">
            <p>
              <strong>&copy; Droble {new Date().getFullYear()}</strong>
            </p>
          </Flex>
        </footer>
      }
    >
      <Routes>
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/outfits" element={<Outfits />} />
      </Routes>
    </AppShell>
  )
}

export default App
