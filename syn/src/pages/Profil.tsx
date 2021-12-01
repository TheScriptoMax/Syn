import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import GlobalHeader from '../components/GlobalHeader';
import { MainContainer } from '../styles/globaleStyles';
import pp from '../assets/image/profile_picture.png'
import AddScripts from '../components/AddScripts';
import { useApi } from '../context/ApiProvider';
import Scripts from '../components/Scripts';

const ProfilWrapper = styled.div`
    display:flex;
`
const SideBar = styled.div`
    display:flex;
    flex-shrink:1;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    padding:10.8rem 0;
`
const Picture = styled.picture`
    width:26.8rem;
    height:26.8rem;
    border-radius:20rem;
    overflow:hidden;
    margin-bottom:3.8rem;
`
const Image = styled.img`
    width:100%;
`
const Name = styled.h2`
    margin-bottom:3.8rem;
`
const Button = styled.button`
    border:none;
`

const ContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
`

const ScriptWrapper = styled.div`

`

const Profil = () => {
    const {api} = useApi()
    const [scripts,setScripts] = useState<any>()
    console.log(scripts)
    useEffect(() => {
        api.get('/user/scripts').then(res=>{
            console.log(res)
            setScripts(res.data)
        })
    }, [])

    return (
        <>
            <GlobalHeader/>
            <MainContainer>
                <ProfilWrapper>
                    <SideBar>
                        <Picture>
                            <Image src={pp} alt="Profil" loading="lazy"/>
                        </Picture>
                        <Name>Maximax</Name>
                        <Button>Modifier le profil</Button>
                    </SideBar>
                    <ContentWrapper>
                        <ScriptWrapper>
                            <AddScripts/>
                            <Scripts/>
                            {scripts && scripts.map((elem:any)=><p>{elem.titre}</p>)}
                        </ScriptWrapper>
                    </ContentWrapper>
                </ProfilWrapper>
            </MainContainer>
        </>
    )
}

export default Profil;