# Task Dummy

A simple task management application built with Node.js/Express backend and a frontend interface for managing tasks.

## 📝 About

Task Dummy is a lightweight task manager that allows users to create, view, and delete tasks. Each task can be assigned to a person and is persisted to a JSON file. The application provides a clean interface for managing your to-do list with real-time updates.

## 🛠️ Technologies Used

- **Backend**: Node.js with Express.js (JavaScript)
- **Frontend**: HTML & JavaScript
- **Data Storage**: JSON file-based persistence
- **HTTP Methods**: REST API with GET, POST, and DELETE operations

## 📁 Project Structure

```
task-dummy/
├── server.js          # Express server with API endpoints
├── package.json       # Project dependencies and metadata
├── tasks.json         # JSON file storing task data
├── public/            # Static files and frontend assets
└── .gitignore         # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Timsmart123/task-dummy.git
cd task-dummy
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:4000
```

## 📚 API Endpoints

### Get All Tasks
```
GET /api/tasks
```
Returns an array of all tasks.

### Add a New Task
```
POST /api/update
Content-Type: application/json

{
  "task": "Task description",
  "to": "Assigned person"
}
```
Adds a new task to the list and persists it to `tasks.json`.

### Delete a Task
```
DELETE /api/delete/:id
```
Deletes a task by its ID.

## 💾 Data Format

Tasks are stored in `tasks.json` with the following structure:
```json
{
  "id": 1779754350121,
  "task": "Task description",
  "to": "Assigned person"
}
```

## 🎯 Usage

1. Start the server using the commands above
2. Access the application at `http://localhost:4000`
3. Add new tasks using the frontend form
4. Assign tasks to team members
5. Delete completed or unnecessary tasks
6. Tasks are automatically saved to `tasks.json`

## 🔄 How It Works

- The server reads tasks from `tasks.json` on startup
- New tasks are sent via POST request to `/api/update`
- Tasks are automatically saved to the JSON file after each modification
- The frontend fetches tasks via GET `/api/tasks` and displays them
- Deleting tasks removes them from the list and updates the JSON file

## 📦 Dependencies

- **express** (^5.2.1) - Web framework for handling HTTP requests

## 📝 License

ISC

## 👤 Author

Timsmart123

## 🐛 Issues & Contributions

Found a bug or have a feature request? Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/Timsmart123/task-dummy).
