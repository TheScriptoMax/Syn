
import React,{useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import { useApi } from '../context/ApiProvider';

const FormWrapper = styled.div`
    display:flex;
    flex-direction:column;
`

const Input = styled.input`
    margin-bottom:1.2rem;
`
const InputShort = styled.input`
    width:10rem;
    overflow:hidden;
    border-radius:1rem;
    padding:0.2rem 1.2rem;
`
const TextArea = styled.textarea`
    resize:none;
`
const Select = styled.select`
    width:10rem;
`

const Label =styled.label`
    margin-bottom:0.8rem;
`
const TagInput = styled.div`
    display:flex;
    justify-content:flex-start;
    border: none;
    padding: 0.4rem; 
    margin-bottom:1.2rem;
`
const Tag = styled.div`
    padding:0.2rem 0.8rem;
    border-radius:1rem;
    background-color:#7D80B3;
    margin-right:1rem;
    color:#ffffff;
    
`
const DeleteTag = styled.button`
    display:inline;
    border:none;
    background-color:transparent;
    color:#ffffff;
`

const Separator = styled.span`
    width:100%;
    height:0.1rem; 
    background-color:black;
    margin-top:2rem;
    margin-bottom:2rem;
`
const ScriptStatusWrapper = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:1rem;
`
const LabelWrapper = styled.div`
    margin-left:1rem;
`
const LabelInfo = styled.p`
    font-size:1.2rem;
`

const SubmitButton = styled.button`

`

const NewScriptForm = () => {
    const {api} = useApi()
    const navigate = useNavigate()

    const[title, setTitle] = useState<string>("")
    const[logline, setLogline] = useState<string>("")
    const[pitch, setPitch] = useState<string>("")
    const[genre, setGenre] = useState<string>("")
    const[genres, setGenres] = useState<any>([])
    const[format, setFormat] = useState<string>("")
    const[selectedRadio, setSelectedRadio] = useState<string>("public")

    const handleTag = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        const inputTrim = genre.trim()
        
        if(e.key === 'Enter'){
            setGenres([...genres,inputTrim])
            setGenre("")
        }
    }

    const handleDeleteTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        const filteredTags = genres.filter((tag:string,i:number)=> i !== index)
        setGenres([...filteredTags])
    }

    const isSelected = (status:string):boolean => {
        return selectedRadio === status
    }  
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setSelectedRadio(e.currentTarget.value)
    }

    const handleSubmit = async ()=>{
        const script = {
            title,
            logline,
            pitch,
            genres,
            format,
            status:selectedRadio
        }
        await api.post('/user/scripts',script).then(async (res)=>{
            console.log(res)
            await api.post('/api/v1/scripts',script).then((res)=>{
                console.log(res)
                navigate('/home')
            })
        })
    }

    
    return (
        <FormWrapper>
            <Label htmlFor="Titre">Titre</Label>
            <Input type="text" id="Titre" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <Label htmlFor="Logline">Logline</Label>
            <Input type="text" maxLength={250} id="Logline"value={logline} onChange={(e)=>setLogline(e.target.value)}/>
            <Label htmlFor="Pitch">Pitch</Label>
            <TextArea rows={5} id="Pitch"value={pitch} onChange={(e)=>setPitch(e.target.value)}></TextArea>
            <Label htmlFor="Genre">Genre</Label>
            <TagInput>
                {genres && genres.map((elem:string,index:number)=><Tag key={index}>{elem}<DeleteTag onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleDeleteTag(e,index)}>X</DeleteTag></Tag>)}
                <InputShort type="text" id="Genre" value={genre} onChange={(e)=>setGenre(e.target.value)} onSubmit={(e)=>e.preventDefault()} onKeyPress={(e:React.KeyboardEvent<HTMLInputElement>)=>handleTag(e)}/>
                
            </TagInput>
            <Label htmlFor="Format">Format</Label>
            <Select id="Format" onChange={(e)=>setFormat(e.target.value)}>
                <option value="Choice">Choissisez un format</option>
                <option value="Long">Long</option>
                <option value="Court">Court</option>
                <option value="Série">Série</option>
            </Select>
            <Separator/>
            <ScriptStatusWrapper>
                <Input type="radio" id="public" value="public" onChange={handleChange} checked={isSelected("public")}/>
                <LabelWrapper>
                    <Label htmlFor="public" >Publique</Label>
                    <LabelInfo>Tout le monde peut voir votre Pitch sur internet, votre Script n'est accessible qu'aux inscrits du site. </LabelInfo>
                </LabelWrapper>
            </ScriptStatusWrapper>
            <ScriptStatusWrapper>
                <Input type="radio" id="pitchOnly" value="pitchOnly" onChange={handleChange} checked={isSelected("pitchOnly")} />
                <LabelWrapper>
                    <Label htmlFor="pitchOnly" >Pitch seulement</Label>
                    <LabelInfo>Tout le monde peut voir votre Pitch sur internet, vous choississez qui a accès à votre Script</LabelInfo>
                </LabelWrapper>
            </ScriptStatusWrapper>
            <ScriptStatusWrapper>
                <Input type="radio" id="private" value="private" onChange={handleChange}  checked={isSelected("private")}/>
                <LabelWrapper>
                    <Label htmlFor="private" >Privée</Label>
                    <LabelInfo>Vous choisissez qui à accès à votre Pitch et votre Script</LabelInfo>
                </LabelWrapper>
            </ScriptStatusWrapper>
            <Separator/>
            <SubmitButton onClick={()=>handleSubmit()}>Créer un Script</SubmitButton>
        </FormWrapper>
    )
}

export default NewScriptForm
