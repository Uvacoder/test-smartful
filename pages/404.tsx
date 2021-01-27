import { Box, Flex, Heading, Image, Link, Text } from "theme-ui";

export default function Custom404() {
  return (
    <Flex
      p={3}
      sx={{
        mx: "auto",
        maxWidth: 600,
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex mb={3} sx={{ alignItems: "center" }}>
        <Heading mr={2} sx={{ fontSize: 4 }}>
          Smartful
        </Heading>
        <Image src="/img/logo.png" width={26} height={26} />
      </Flex>
      <Text mb={3}>Sorry! We can't find that page. (404)</Text>
      <Link href="/">Go to home page »</Link>
    </Flex>
  );
}
