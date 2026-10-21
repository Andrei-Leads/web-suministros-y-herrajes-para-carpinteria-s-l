import config from "@/site.config";
import { SeparadorVertical } from "@/components/Decorados";
import { BandaCta } from "@/components/secciones/BandaCta";
import { ComoTrabajamos } from "@/components/secciones/ComoTrabajamos";
import { HeroInicio } from "@/components/secciones/HeroInicio";
import { HorarioFachada } from "@/components/secciones/HorarioFachada";
import { MarcasCarrusel } from "@/components/secciones/MarcasCarrusel";
import { RejillaFamilias } from "@/components/secciones/RejillaFamilias";
import { SobreNosotrosAvance } from "@/components/secciones/SobreNosotrosAvance";
import { Trayectoria } from "@/components/secciones/Trayectoria";

/** Inicio (spec §5.1): S1 hero · S2 sobre nosotros · S3 horario · S4 familias · S5 cómo trabajamos · S6 marcas · S7 desde · S8 separador · S9 banda CTA. */
export default function Page() {
  const { negocio, contacto, empresa, servicios } = config;
  return (
    <>
      <HeroInicio negocio={negocio} contacto={contacto} imagenes={config.imagenesHero} />
      <SobreNosotrosAvance negocio={negocio} historia={empresa.historia} />
      <HorarioFachada contacto={contacto} fachada={empresa.imagenes[0]} />
      <div className="mt-[clamp(40px,5vw,80px)]">
        <RejillaFamilias servicios={servicios} />
      </div>
      <ComoTrabajamos negocio={negocio} proceso={config.proceso} conWhatsapp={Boolean(contacto.whatsapp)} />
      {config.marcas.length > 0 && <MarcasCarrusel marcas={config.marcas} />}
      <Trayectoria anioFundacion={negocio.anioFundacion} ciudad={contacto.direccion.ciudad} imagen={empresa.imagenes[1]} />
      <SeparadorVertical className="my-6" />
      <BandaCta contacto={contacto} servicios={servicios} />
    </>
  );
}
