import { useMantineColorScheme } from "@mantine/core";
import { CSSProperties, useEffect, useState } from "react";

const defaultLogoSrc = "/img/logo.png";
const darkLogoSrc = "/img/logo-dark.png";

type LogoProps = {
  height: number;
  width: number;
  /**
   * When true, the logo keeps its natural aspect ratio and is contained
   * within the height/width box (no stretching / squashing).
   * Defaults to true to avoid visible distortion when the source logo
   * is not square (e.g. 900x499 wordmark).
   */
  preserveAspectRatio?: boolean;
};

const Logo = ({ height, width, preserveAspectRatio = true }: LogoProps) => {
  const { colorScheme } = useMantineColorScheme();
  const preferredLogoSrc =
    colorScheme === "dark" ? darkLogoSrc : defaultLogoSrc;
  const [logoSrc, setLogoSrc] = useState(preferredLogoSrc);

  useEffect(() => {
    setLogoSrc(preferredLogoSrc);
  }, [preferredLogoSrc]);

  const style: CSSProperties = preserveAspectRatio
    ? {
        maxHeight: height,
        maxWidth: width,
        height: "auto",
        width: "auto",
        objectFit: "contain",
      }
    : {};

  return (
    <img
      src={logoSrc}
      alt="logo"
      height={height}
      width={width}
      style={style}
      onError={() => {
        if (logoSrc !== defaultLogoSrc) setLogoSrc(defaultLogoSrc);
      }}
    />
  );
};
export default Logo;
