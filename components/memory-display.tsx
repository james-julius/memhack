'use client'
import { ResponsiveRadar } from '@nivo/radar'
import { useEffect, useMemo } from 'react'

type EmotionKeys = 'fear' | 'anger' | 'sadness' | 'surprise' | 'joy' | 'love'

interface EmotionSet {
  fear: number
  anger: number
  sadness: number
  surprise: number
  joy: number
  love: number
}

interface Memory {
  event: string
  date: string
  emotions: EmotionSet
}

const memories: Memory[] = [
  {
    event: 'Dudley’s Birthday at the Zoo',
    date: '1991-06-23',
    emotions: {
      fear: 3,
      anger: 4,
      sadness: 5,
      surprise: 7,
      joy: 2,
      love: 1
    }
  },
  {
    event: 'Meeting Rubeus Hagrid and Learning He’s a Wizard',
    date: '1991-07-31',
    emotions: {
      fear: 4,
      anger: 1,
      sadness: 2,
      surprise: 10,
      joy: 9,
      love: 3
    }
  },
  {
    event: 'Meeting Ron Weasley',
    date: '1991-09-01',
    emotions: {
      fear: 2,
      anger: 1,
      sadness: 1,
      surprise: 3,
      joy: 8,
      love: 6
    }
  },
  {
    event: 'Meeting Hermione Granger',
    date: '1991-09-01',
    emotions: {
      fear: 1,
      anger: 2,
      sadness: 1,
      surprise: 4,
      joy: 5,
      love: 3
    }
  },
  {
    event:
      "Winning the Triwizard Tournament and Witnessing Cedric Diggory's Death",
    date: '1995-06-24',
    emotions: {
      fear: 10,
      anger: 8,
      sadness: 10,
      surprise: 7,
      joy: 1,
      love: 2
    }
  },
  {
    event: 'Death of Sirius Black',
    date: '1996-06-18',
    emotions: {
      fear: 8,
      anger: 7,
      sadness: 10,
      surprise: 5,
      joy: 0,
      love: 6
    }
  },
  {
    event: 'Being Sorted into Gryffindor House',
    date: '1991-09-01',
    emotions: {
      fear: 4,
      anger: 1,
      sadness: 2,
      surprise: 6,
      joy: 7,
      love: 3
    }
  },
  {
    event: 'Winning the House Cup in His First Year',
    date: '1992-06-07',
    emotions: {
      fear: 2,
      anger: 1,
      sadness: 1,
      surprise: 5,
      joy: 10,
      love: 4
    }
  },
  {
    event: 'First Time Playing Quidditch',
    date: '1991-11-07',
    emotions: {
      fear: 6,
      anger: 2,
      sadness: 1,
      surprise: 7,
      joy: 8,
      love: 3
    }
  },
  {
    event: 'First Kiss with Ginny Weasley',
    date: '1997-05-02',
    emotions: {
      fear: 1,
      anger: 1,
      sadness: 1,
      surprise: 5,
      joy: 9,
      love: 10
    }
  }
]

const emotions: EmotionKeys[] = [
  'fear',
  'anger',
  'sadness',
  'surprise',
  'joy',
  'love'
]

const MyResponsiveRadar = ({ data }: { data: EmotionSet[] }) => {
  const structure = useMemo(() => {
    const entries = []
    for (const emotion of emotions) {
      // Get the emotion values for each memory event
      const result: { [key: string]: string | number } = {
        emotion
      }
      // Process the values out of the memory history
      // @ts-ignore
      data.forEach((memory: Memory) => {
        result[memory.event] = memory[emotion]
      })
      debugger
      entries.push(result)
    }
    return entries
  }, [data])

  useEffect(() => {
    console.log({ structure })
  }, [structure])
  return (
    <ResponsiveRadar
      data={structure}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      keys={memories.map((entry: Memory) => entry.event)}
      indexBy="emotion"
      borderColor={{ from: 'color' }}
      gridLabelOffset={16}
      dotSize={5}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      colors={{
        scheme: 'spectral'
      }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: 0,
          translateY: 0,
          itemWidth: 20,
          itemHeight: 20,
          itemTextColor: '#444',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )
}

export default function MemoryDisplay() {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Memories
      </h4>
      <div className="size-full px-4">
        <MyResponsiveRadar
          data={memories.map((entry: Memory) => ({
            ...entry.emotions,
            event: entry.event
          }))}
        />
      </div>
    </div>
  )
}
