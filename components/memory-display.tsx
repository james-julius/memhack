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
    event: 'First day of school',
    date: '2021-09-01',
    emotions: {
      fear: 7,
      anger: 2,
      sadness: 6,
      surprise: 4,
      joy: 3,
      love: 1
    }
  },
  {
    event: 'Summer Vacation at the Beach',
    date: '2021-09-01',
    emotions: {
      fear: 6,
      anger: 8,
      sadness: 5,
      surprise: 7,
      joy: 4,
      love: 2
    }
  },
  {
    event: 'Graduation Day',
    date: '2021-09-01',
    emotions: {
      fear: 8,
      anger: 6,
      sadness: 9,
      surprise: 5,
      joy: 7,
      love: 3
    }
  },
  {
    event: 'Moving to a New City',
    date: '2021-09-01',
    emotions: {
      fear: 9,
      anger: 7,
      sadness: 8,
      surprise: 9,
      joy: 6,
      love: 4
    }
  },
  {
    event: 'Adopting a Pet',
    date: '2021-09-01',
    emotions: {
      fear: 5,
      anger: 9,
      sadness: 7,
      surprise: 6,
      joy: 8,
      love: 5
    }
  }
]
const emotions: EmotionKeys[] = ['fear', 'anger', 'sadness', 'surprise', 'joy', 'love']

const MyResponsiveRadar = ({ data }: { data: EmotionSet[] }) => {

    const structure = useMemo(() => {
        const entries = []
        for (const emotion of emotions) {

            // Get the emotion values for each memory event
            const result: { [key: string]: string | number } = {
                emotion,
            }
            // Process the values out of the memory history
            // @ts-ignore
            data.forEach((memory: Memory) => {
                result[memory.event] = memory[emotion]
            })
            debugger;
            entries.push(result)
        }
        return entries;
    }, [data])

    useEffect(() => {
        console.log({ structure })
    }, [structure ])
    return (
        <ResponsiveRadar
            data={structure}
            keys={memories.map((entry: Memory) => entry.event)}
            indexBy="emotion"
            borderColor={{ from: 'color' }}
            gridLabelOffset={-10}
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
            ]} />
    )
}

export default function MemoryDisplay() {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Memories
      </h4>
      <div className="size-3/4 px-4">
              <MyResponsiveRadar data={memories.map((entry: Memory) => ({
                    ...entry.emotions,
                    event: entry.event
              }))} />
      </div>
    </div>
  )
}
