import { AppShell, Burger, NavLink, Divider, Stack, Text, useMantineTheme, TextInput, Switch, rem, useMantineColorScheme } from "@mantine/core"
import { useDebouncedValue, useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconArrowBackUp, IconLayoutDashboard, IconUser, IconSearch, IconMoon, IconSun
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import PontuaLogo from '@/assets/img/logo-dark.svg'
import PontuaLogoDark from '@/assets/img/logo-pontua.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { modals } from '@mantine/modals';
import { logout } from "@/utils/storage/cookie";

const Main = () => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const _location = useLocation()
  const { breakpoints, colors } = useMantineTheme();
  const mediaQuery = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(colorScheme === 'dark');
  const navigate = useNavigate()
  const [filteredValue, setFilteredValue] = useState('')  
  const [debouncedValue] = useDebouncedValue(filteredValue, 500);
  
  const sidabarData = [
    { label: 'Home', leftSection: <IconLayoutDashboard size="24" />, to: '/' },
    {
      label: 'Perfil',
      leftSection: <IconUser size="24" />,
      to: '/profile'
    },
  ];
  const lastOption = { label: 'Sair', leftSection: <IconArrowBackUp size="24" />, }
  const handleNavActive = (key: string) => {
    const pathnames = {
      '': 0,
      'profile': 1
    }
    const newKey = key.split('/')[1]
    setActive(pathnames[newKey as keyof typeof pathnames])
  }
  useEffect(() => {
    handleNavActive(_location.pathname)
  }, [_location])
  useEffect(() => {
    navigate(`?agent=${debouncedValue}`)
  }, [debouncedValue])

  const openModal = () => modals.openConfirmModal({
    title: 'Confirme sua ação',
    children: (
      <Text size="sm">Deseja realmente sair da aplicação?</Text>
    ),
    labels: { confirm: 'Sim', cancel: 'Não' },
    onCancel: () => {},
    onConfirm: () => {
      logout()
    },
    centered: true
  });

  return (
    <AppShell
      header={{ height: mediaQuery ? 0 : 64 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header display={'flex'} h={83}>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          m={12}
          size="lg"
        />
        {_location.pathname === '/' &&
          <TextInput
            ml={mediaQuery ? 340 : 0}
            leftSection={<IconSearch />}
            placeholder="Busque um agente"
            mt={16}
            mr={32}
            onChange={(event) => {
              setFilteredValue(event.currentTarget.value)
            }}
          />
        }
        <Switch
          checked={checked}
          onChange={(event) => {
            const newTheme = event.currentTarget.checked ? 'dark' : 'light'
            setColorScheme(newTheme)
            setChecked(event.currentTarget.checked)
          }}
          pos={'absolute'}
          right={24}
          top={24}
          color="blue"
          size="lg"
          thumbIcon={
            checked ? (
              <IconMoon
                style={{ width: rem(16), height: rem(16) }}
                color={colors.blue[10]}
                stroke={3}
              />
            ) : (
              <IconSun
                style={{ width: rem(16), height: rem(16) }}
                color={colors.red[6]}
                stroke={3}
              />
            )
          }
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack display={'flex'}>
          <img src={colorScheme === 'dark' ? PontuaLogoDark : PontuaLogo } width={169} height={50} />
        </Stack>
        <Divider my="md" />
        {sidabarData.map((item, index) => (
          <NavLink
            key={item.label}
            active={index === active}
            label={<Text size="md">{item.label}</Text>}
            leftSection={item.leftSection}
            onClick={() => setActive(index)}
            variant="subtle"
            onClickCapture={() => {
              navigate(item.to)
              toggle()
            }}
          />
        ))}
        <Divider my="md" />
        <NavLink
          key={lastOption.label}
          label={<Text size="md">{lastOption.label}</Text>}
          leftSection={lastOption.leftSection}
          onClick={() => {
            openModal()
          }}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack mt={mediaQuery ? 64 : 0}>
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default Main