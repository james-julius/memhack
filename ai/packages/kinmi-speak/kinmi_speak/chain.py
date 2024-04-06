import os
import getpass
import uuid

from dotenv import load_dotenv

from typing import AsyncIterator, Iterable
from langchain_anthropic.chat_models import ChatAnthropic
from langchain_openai.chat_models import ChatOpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser, SimpleJsonOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AIMessage, AIMessageChunk
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.runnables import RunnableGenerator
from langmem import AsyncClient
from langmem.integrations.langchain import LangMemChatMessageHistory


load_dotenv()


def stream_byte_parser(chunks: Iterable[AIMessageChunk]) -> Iterable[bytes]:
    for chunk in chunks:
        yield chunk.content.encode("utf-8")

async def astream_byte_parser(chunks: AsyncIterator[AIMessageChunk]) -> AsyncIterator[bytes]:
    async for chunk in chunks:
        yield chunk.content.encode("utf-8")


streaming_byte_generator = RunnableGenerator(transform=stream_byte_parser,atransform=astream_byte_parser)


client = AsyncClient()
model = ChatAnthropic(model="claude-3-haiku-20240307")
model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You're a helpful AI assistant. Be an inquisitive and personable friend to them. Get to know them well!{user_profile}",
        ),
        ("placeholder", "{messages}"),
        ("placeholder", "{input}"),
    ]
)


# Function for querying the memories
async def query_memories(inputs: dict, config: dict):
    message = inputs["input"][-1]
    user_id = message.additional_kwargs.get("user_id")
    user_profile = ""
    if user_id:
        mem_result = await client.query_user_memory(user_id, text=message.content)
        memories = mem_result["memories"]
        if memories:
            formatted = "\n".join([mem["text"] for mem in memories])
            user_profile = f"""
Below are memories from past interactions:
{formatted}

End of memories.
"""
    return {
        **inputs,
        "input": [HumanMessage(**msg.__dict__) for msg in inputs['input']],
        "user_profile": user_profile
    }


runnable = query_memories | prompt | model | StrOutputParser()

def get_message_history(session_id: str) -> LangMemChatMessageHistory:
    return LangMemChatMessageHistory(thread_id=session_id)


# Wrapping the runnable in a message history will load and save messages to langmem on every turn.
chain = RunnableWithMessageHistory(
    runnable,
    get_message_history,
    input_messages_key="input",
    history_messages_key="messages",
    # additional_kwargs={"user_id": "abc"}
)

def tap(input):
    print(input)
    return input


# async def chain(text: str, thread_id: uuid.UUID, user_id: uuid.UUID):
#     stream = with_message_history.astream(
#         {"input": [HumanMessage(content=text, additional_kwargs={"user_id": user_id})]},
#         config={
#             "configurable": {"session_id": thread_id},
#         },
#     )
#     async for tok in stream:
#         print(tok, end="")

