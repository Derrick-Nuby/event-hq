import jwt from 'jsonwebtoken';

export function createToken(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  expiresIn: string = '168h'
) {

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    return jwt.sign(
      data,
      jwtSecret,
      { expiresIn }
    );
  } catch (error) {
    console.error('Error creating token:', error);
    throw new Error('Failed to create token');
  }
}