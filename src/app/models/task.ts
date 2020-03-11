export interface Task {
  id?: { $oid: string };
  userId: string;
  name: string;
  created: string;
  end?: string;
  isDone: boolean;
}
