import { Avatar, Button, Combobox, Grid, Loader, Text, TextInput, useCombobox } from "@mantine/core"
import AuthContainer from "./components/Container"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { IconUser } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import api from '@/utils/api'
import Character from "@/@types/Character";
import { local } from '@/utils/storage'
interface Items {
  value: string;
  label: string;
  thumbnail: string;
}

const ChooseAgent = () => {
  const [value, setValue] = useState('')
  const [selectedHero, setSelectedHero] = useState<Items>({value: '', label: '', thumbnail: ''});
  const [items, setItems] = useState<Items[]>([])
  const navigate = useNavigate()
  const combobox = useCombobox();
  const [debouncedValue] = useDebouncedValue(value, 500);
  const [loading, setLoading] = useState(false)

  const options = items.map((item) => (
    <Combobox.Option value={item.value} key={item.value} display={'flex'}>
      <Avatar src={item.thumbnail} alt={item.label} />
      <Text mt={8} ml={8}>{item.label}</Text>
    </Combobox.Option>
  ));

  useEffect(() => {
    if (debouncedValue && debouncedValue.trim().length) {
      setLoading(true)
      api.get(`characters?name=${debouncedValue}`)
      .then(({data}) => {
        const res = data.data.results.map((item: Character) => ({
          value: item.id,
          label: item.name,
          thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension
        }));
        setItems(res)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [debouncedValue])
  

  return (
    <AuthContainer>
      <Grid mt={24}>
        <Grid.Col display={'flex'}>
          <Text size="36px" color='blue.10' fw={700}>
            Selecione o seu agente mais legal
            <span style={{color: '#F43724'}}>.</span>
          </Text>
        </Grid.Col>
        <Grid.Col>
          <Text size="sm" color="gray.10">Tenha a visão completa do seu agente.</Text>
        </Grid.Col>
        <Grid.Col>
          <Combobox
            onOptionSubmit={(optionValue) => {          
              if (optionValue) {
                const it = items.find(item => item.value === optionValue) || {label: '', value: '', thumbnail: ''};
                local.setHeroe(JSON.stringify(it));
                setSelectedHero(it);
                setValue(it.label);
              }
              combobox.closeDropdown();
            }}
            store={combobox}
          >
            <Combobox.Target>
              <TextInput
                placeholder="Selecione um agente"
                value={value}
                onChange={(event) => {
                  setValue(event.currentTarget.value)
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                leftSection={selectedHero.thumbnail !== '' ? 
                <img src={selectedHero.thumbnail} height={32} style={{borderRadius: 16}} /> : 
                loading ? <Loader color="blue" size={'sm'}/> : <IconUser />}
              />
            </Combobox.Target>
            <Combobox.Dropdown>
              {!!loading && <Combobox.Empty>carregando...</Combobox.Empty>}
              {!loading && <Combobox.Options>
                {options.length === 0 ? <Combobox.Empty>sem registro</Combobox.Empty> : options}
              </Combobox.Options>}
            </Combobox.Dropdown>
          </Combobox>
        </Grid.Col>
        <Grid.Col display={'flex'} style={{justifyContent: 'end'}}>
          <Button variant="filled" color='blue.10' onClick={() => navigate('/')} disabled={selectedHero.value === ''}>entrar</Button>
        </Grid.Col>
      </Grid>
    </AuthContainer>
  )
}

export default ChooseAgent