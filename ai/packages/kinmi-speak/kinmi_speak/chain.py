from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import PostgresChatMessageHistory
import os
from typing import AsyncIterator, Iterable

from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser, SimpleJsonOutputParser
from langchain_core.messages import AIMessage, AIMessageChunk
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableGenerator

load_dotenv()

model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You're an assistant who helps people remember insights about themselves and record it into memory",
        ),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{input}"),
    ]
)


def stream_byte_parser(chunks: Iterable[AIMessageChunk]) -> Iterable[bytes]:
    for chunk in chunks:
        yield chunk.content.encode("utf-8")


async def astream_byte_parser(chunks: AsyncIterator[AIMessageChunk]) -> AsyncIterator[bytes]:
    async for chunk in chunks:
        yield chunk.content.encode("utf-8")


streaming_byte_generator = RunnableGenerator(
    transform=stream_byte_parser, atransform=astream_byte_parser)

runnable = prompt | model | StrOutputParser()  # streaming_byte_generator


POSTGRES_AI = os.environ.get("POSTGRES_AI")


def get_message_history(session_id):
    history = PostgresChatMessageHistory(
        connection_string=POSTGRES_AI,
        session_id=session_id,
    )
    print("MESSAGES")
    print(history.messages)
    return history


chain = RunnableWithMessageHistory(
    runnable,
    get_message_history,
    input_messages_key="input",
    history_messages_key="history",
)
