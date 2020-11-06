import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  orders: Array<Order>;
  reviews: Array<Review>;
  reviewByID?: Maybe<Review>;
  getReviewByUser: Array<Review>;
  getReviewByTour: Array<Review>;
  tours: Array<Tour>;
  tourByID?: Maybe<Tour>;
  users: Array<User>;
  userByID?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryReviewByIdArgs = {
  reviewId: Scalars['Float'];
};


export type QueryGetReviewByUserArgs = {
  data: GetUser;
};


export type QueryGetReviewByTourArgs = {
  tourId: Scalars['Float'];
};


export type QueryToursArgs = {
  data: Scalars['String'];
};


export type QueryTourByIdArgs = {
  tourId: Scalars['Float'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['Float'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  quantity: Scalars['Float'];
  reservation: Scalars['String'];
  total: Scalars['Float'];
  userId: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  avatar: Scalars['String'];
  reviews: Array<Review>;
  orders: Array<Order>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  description: Scalars['String'];
  rating: Scalars['Float'];
  userId: User;
  tourId: Tour;
};

export type Tour = {
  __typename?: 'Tour';
  id: Scalars['Int'];
  name: Scalars['String'];
  image: Array<Scalars['String']>;
  description: Scalars['String'];
  location: Scalars['String'];
  price: Scalars['Float'];
  reviews: Array<Review>;
};

export type GetUser = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Order;
  createReview: Review;
  createTours: Tour;
  register: GetToken;
  login: GetToken;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
};


export type MutationCreateReviewArgs = {
  data: ReviewInput;
};


export type MutationCreateToursArgs = {
  data: CreateInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type OrderInput = {
  quantity: Scalars['Float'];
  reservation: Scalars['String'];
  total: Scalars['Float'];
  stripeId: Scalars['String'];
};

export type ReviewInput = {
  rating: Scalars['Float'];
  description: Scalars['String'];
  tourid: Scalars['Int'];
};

export type CreateInput = {
  name: Scalars['String'];
  images: Scalars['String'];
  location: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
};

export type GetToken = {
  __typename?: 'getToken';
  accessToken: Scalars['String'];
  user: User;
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'getToken' }
    & Pick<GetToken, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);


export const UsersDocument = gql`
    query users {
  users {
    name
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const RegisterDocument = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
  register(data: {name: $name, email: $email, password: $password}) {
    accessToken
    user {
      id
      name
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;