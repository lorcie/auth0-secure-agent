import httpx
from langchain_core.tools import StructuredTool
from langchain_core.runnables.config import RunnableConfig
from pydantic import BaseModel, Field

from common.config import settings
import json
from typing import Dict, List, Any

class TaskStateSchema(BaseModel):
    assignee: str = Field(..., description="The person this task is assigned to.")

with open("/app/app/agents/tools/project_tasks_list.json") as json_file:
    PROJECT_TASKS = json.load(json_file)
    print(PROJECT_TASKS)

def get_task_details_tool_fn(assignee: Any) -> Dict[str, Any]:
    """Retrieves the details of a specific task by its assignee.
    Args:
        assignee: The assignee of the task.
    Returns:
        A dictionary with the task's details (title, project, assignee, status, due date)
        or an empty dictionary if the task is not found.
    """
    print(f">>> 🛠️ Tool: 'get_task_details' called for '{assignee}'")

    for task in PROJECT_TASKS:
        if task["assignee"].lower() == assignee.lower():
            return task
    return {}

get_task_details = StructuredTool.from_function(
    func=get_task_details_tool_fn,
    name="get_task_details",
    description="Update the assignee of a task.",
    args_schema=TaskStateSchema,  # ← this is how you tie in the schema
)
