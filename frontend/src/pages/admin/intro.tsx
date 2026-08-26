import {
  Button,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import Logo from "../../components/Logo";
import Meta from "../../components/Meta";

const Intro = () => {
  return (
    <>
      <Meta title="Intro" />
      <Container size="xs">
        <Stack>
          <Center>
            <Logo height={80} width={160} preserveAspectRatio />
          </Center>
          <Center>
            <Title order={2}>Bienvenue sur NGH Share</Title>
          </Center>
          <Text>
            Plateforme professionnelle de partage de fichiers, opérée par
            NGH Corp Lomé. Alternative sécurisée à WeTransfer, hébergée en
            interne avec chiffrement bout-en-bout et politique zéro-accès.
          </Text>
          <Text>
            Support et contact :{" "}
            <a href="mailto:support@ngh.network">support@ngh.network</a>
          </Text>
          <Text mt="lg">Comment souhaitez-vous continuer ?</Text>
          <Stack>
            <Button href="/admin/config/general" component={Link}>
              Personnaliser la configuration
            </Button>
            <Button href="/" component={Link} variant="light">
              Explorer NGH Share
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Intro;
