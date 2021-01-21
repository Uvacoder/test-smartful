import { format, formatISO, parseISO, startOfToday } from "date-fns";
import Markdown from "markdown-to-jsx";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import { Box, Card, Flex, IconButton, Image, Heading, Link, NavLink, Text } from "theme-ui";
import { DateNav } from "../components/DateNav";
import { getData } from "../lib/getData";
import { PlayCircle } from "../utils/icons";

const categories = [
  { id: "word", name: "Word" },
  { id: "idiom", name: "Idiom" },
  { id: "funFacts", name: "Fun facts" },
  { id: "artist", name: "Artist" },
  { id: "wiki", name: "Wikipedia article" },
  { id: "person", name: "Historical figure" },
  { id: "event", name: "Historic event" },
  { id: "charity", name: "Charity" },
  { id: "quote", name: "Quote" },
];

export interface HomeProps {
  data: any;
  dateISO: string;
}

export default function Home({ data, dateISO }: HomeProps) {
  const { artist, charity, event, funFacts, idiom, person, quote, wiki, word } = data;
  const date = parseISO(dateISO);
  const dateDisplay = format(date, "MMM d"); // e.g., Jan 1, Mar 10

  const speakWord = () => {
    const url = `/static/${word.audioPath}`;
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div>
      <Head>
        <title>Smartful :: {dateDisplay} :: Learn something every day</title>
      </Head>
      <Box bg="yellow" py={2} />
      <Box sx={{ maxWidth: 900, mx: "auto", px: 3, py: [4, 5] }}>
        <Box sx={{ display: [null, "flex"], alignItems: [null, "flex-start"] }}>
          <Box
            p={[1, 2]}
            mr={[0, 3]}
            sx={{
              flex: "none",
              width: ["auto", 225],
              position: ["static", "sticky"],
              top: 0,
            }}
          >
            <Box px={[0, 1]} mb={[1, 4]}>
              <Link variant="heading" href="/" sx={{ display: "flex", alignItems: "center" }}>
                <Box mr={2}>Smartful</Box>
                <NextImage src="/smartful.png" width={26} height={26} />
              </Link>
              <Text sx={{ fontSize: 0 }}>Learn something every day</Text>
            </Box>
            <Box sx={{ display: ["none", "block"] }}>
              {categories.map((c) => (
                <NavLink key={c.id} href={`#${c.id}`} px={[0, 1]}>
                  {c.name}
                </NavLink>
              ))}
            </Box>
          </Box>
          <Box p={[1, 2]} sx={{ flex: "1 1 auto" }}>
            <DateNav date={date} />
            <Box id="word" py={1}>
              <Card mb={4}>
                <Text variant="cardLabel">Word</Text>
                <Box mb={3}>
                  <Flex sx={{ alignItems: "center" }}>
                    <Text mr={1} sx={{ fontSize: 4, fontWeight: "bold" }}>
                      {word.word}
                    </Text>
                    <IconButton p={0} sx={{ width: 26, height: 26 }} onClick={speakWord}>
                      <PlayCircle size={20} />
                    </IconButton>
                  </Flex>
                  <Text sx={{ color: "gray", fontSize: 1 }}>{word.partOfSpeech}</Text>
                </Box>
                <Box mb={3}>
                  <Text variant="textLabel">Definition</Text>
                  <Text>{word.definitions[0]}</Text>
                </Box>
                <Box mb={3}>
                  <Text variant="textLabel">Example</Text>
                  <Box as={Markdown}>{word.examples[0]}</Box>
                </Box>
                <Box>
                  <Text variant="textLabel">History</Text>
                  <Box as={Markdown}>{word.didYouKnow}</Box>
                </Box>
              </Card>
            </Box>
            <Box id="idiom" py={1}>
              <Card mb={3}>
                <Text variant="cardLabel">Idiom</Text>
                <Text mb={3} sx={{ fontSize: 4, fontWeight: "bold" }}>
                  {idiom.term}
                </Text>
                <Box as={Markdown}>{idiom.definition}</Box>
              </Card>
            </Box>
            <Box id="funFacts" py={1}>
              <Card mb={3}>
                <Text variant="cardLabel">Fun facts</Text>
                <Box as="ol">
                  {funFacts.map((fact) => (
                    <Box key={fact.number} as="li">
                      {fact.text}
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>
            <Box id="artist" py={1}>
              <Card mb={3}>
                <Flex mb={2}>
                  <Box>
                    <Text variant="cardLabel">Artist</Text>
                    <Box mb={3}>
                      <Text variant="heading" mb={1} sx={{ fontSize: 4 }}>
                        {artist.name}
                      </Text>
                      <Text sx={{ color: "gray", fontSize: 1 }}>{artist.dates}</Text>
                    </Box>
                  </Box>
                  <Box ml="auto" sx={{ flex: "none" }}>
                    <Image
                      as={NextImage}
                      src={`/static/${artist.mainImg}`}
                      alt={artist.name}
                      width={100}
                      height={100}
                      sx={{ borderRadius: 10 }}
                    />
                  </Box>
                </Flex>
                <Box mb={3}>
                  {artist.summary.slice(0, 2).map((paragraph, i) => (
                    <Text key={i} as="p" mb={2}>
                      {paragraph}
                    </Text>
                  ))}
                </Box>
                <Box
                  mb={3}
                  sx={
                    {
                      display: "grid",
                      gridGap: [2, 3],
                      gridTemplateColumns: "repeat(4, 1fr)",
                    } as any
                  }
                >
                  {artist.artworkImgs.slice(0, 4).map((img, i) => (
                    <Image
                      key={i}
                      as={NextImage}
                      src={`/static/${img.path}`}
                      alt={img.name}
                      width={250}
                      height={250}
                      sx={{ borderRadius: 10 }}
                    />
                  ))}
                </Box>
                <Link href={artist.urlGoogle}>Learn more</Link>
              </Card>
            </Box>
            <Box id="wiki" py={1}>
              <Card mb={3}>
                <Text variant="cardLabel">Wikipedia article</Text>
                <Text mb={3} sx={{ fontSize: 4, fontWeight: "bold" }}>
                  {wiki.name}
                </Text>
                <Box mb={3}>{wiki.summary}</Box>
                <Link href={wiki.url}>Learn more</Link>
              </Card>
            </Box>
            <Box id="person" py={1}>
              <Card mb={3}>
                <Flex mb={2}>
                  <Box>
                    <Text variant="cardLabel">Historical figure</Text>
                    <Box mb={3}>
                      <Text variant="heading" mb={1} sx={{ fontSize: 4 }}>
                        {person.name}
                      </Text>
                      <Text sx={{ color: "gray", fontSize: 1 }}>{person.dates}</Text>
                    </Box>
                  </Box>
                  <Box ml="auto" sx={{ flex: "none" }}>
                    <Image
                      as={NextImage}
                      src={`/static/${person.mainImg}`}
                      alt={person.name}
                      width={100}
                      height={100}
                      sx={{ borderRadius: 10 }}
                    />
                  </Box>
                </Flex>
                <Box mb={3}>
                  {person.summary.map((paragraph, i) => (
                    <Text key={i} as="p" mb={2}>
                      {paragraph}
                    </Text>
                  ))}
                </Box>
                <Link href={person.urlWiki}>Learn more</Link>
              </Card>
            </Box>
            <Box id="event" py={1}>
              <Card mb={3}>
                <Flex mb={2}>
                  <Box>
                    <Text variant="cardLabel">Historic event</Text>
                    <Box mb={3}>
                      <Text variant="heading" mb={1} sx={{ fontSize: 4 }}>
                        {event.name}
                      </Text>
                      <Text sx={{ color: "gray", fontSize: 1 }}>{event.dates}</Text>
                    </Box>
                  </Box>
                  <Box ml="auto" sx={{ flex: "none" }}>
                    <Image
                      as={NextImage}
                      src={`/static/${event.mainImg}`}
                      alt={event.name}
                      width={100}
                      height={100}
                      sx={{ borderRadius: 10 }}
                    />
                  </Box>
                </Flex>
                <Box mb={3}>
                  {event.summary.map((paragraph, i) => (
                    <Text key={i} as="p" mb={2}>
                      {paragraph}
                    </Text>
                  ))}
                </Box>
                <Link href={person.urlWiki}>Learn more</Link>
              </Card>
            </Box>
            <Box id="charity" py={1}>
              <Card mb={3}>
                <Text variant="cardLabel">Charity</Text>
                <Box mb={3}>
                  <Text variant="heading" mb={1} sx={{ fontSize: 4 }}>
                    {charity.name}
                  </Text>
                  <Text sx={{ color: "gray", fontSize: 1 }}>
                    {charity.category} • {charity.cause}
                  </Text>
                </Box>
                <Box mb={3}>
                  <Markdown>{charity.mission}</Markdown>
                </Box>
                <Link href={charity.url}>Learn more</Link>
              </Card>
            </Box>
            <Box id="quote" py={1}>
              <Card mb={3}>
                <Text variant="cardLabel">Quote</Text>
                <Text sx={{ fontSize: 4 }}>“{quote.quote}”</Text>
                <Text color="gray" sx={{ fontSize: 1 }}>
                  {quote.author}
                </Text>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const data = getData();
  const today = startOfToday();
  const dateISO = formatISO(today, { representation: "date" });

  return {
    props: {
      data,
      dateISO,
    },
  };
};
