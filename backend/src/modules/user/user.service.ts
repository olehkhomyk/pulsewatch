import { userRepo } from './user.repo.js';

export const listUsers = () => userRepo.findAll();
