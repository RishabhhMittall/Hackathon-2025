import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import playerPositionApi from '../position/playerPositionApi'
import statsRankingApi from '../stats/statsRankingApi'
import dashboardApi from '../dashboard/dashboardApi'

export const adminApi= createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api`,
        credentials:'include',

    }),
    tagTypes:['ADMIN','EMPLOYEE'],

    endpoints: (builder) => ({

      getHomeStats: builder.query({
        query: () => `/admin/home-stats`,
        providesTags:['ADMIN']
      }),
      getTrendingPlayers: builder.query({
        query: () => `/admin/trending-players`,
        providesTags:['ADMIN']
      }),
      getSoldPlayers:builder.query({
        query: () => `/admin/recently-sold`,
        providesTags:['ADMIN']
      }),
      getEmployeeDetails:builder.query({
        query:()=>'/admin/employee-details',
        providesTags:['EMPLOYEE'],
      }),
      addNewEmpoyee: builder.mutation({
        query: (formData) => {
            return {
                url:'/users/create-admin',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['EMPLOYEE'],
      }),
      removeEmployee:builder.mutation({
        query: (formData) => {
            return {
                url:'/users/remove-admin',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['EMPLOYEE'],
      }),
      updateEmployee:builder.mutation({
        query: (formData) => {
            return {
                url:'/users/update-admin',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['EMPLOYEE'],
      }),
      removePlayers:builder.mutation({
        query: (formData) => {
            return {
                url:'/admin/remove-players',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['ADMIN'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
              await queryFulfilled;
              dispatch(dashboardApi.util.invalidateTags(['Dashboard']));
              dispatch(playerPositionApi.util.invalidateTags(['PlayerPosition']));
              dispatch(statsRankingApi.util.invalidateTags(['STATS']));
          } catch (error) {
              console.error("Error removing player:", error);
          }
      }
      })
    }),

  })

  export const {
    useGetHomeStatsQuery,
    useGetTrendingPlayersQuery,
    useGetSoldPlayersQuery,
    useGetEmployeeDetailsQuery,
    useAddNewEmpoyeeMutation,
    useRemoveEmployeeMutation,
    useUpdateEmployeeMutation,
    useRemovePlayersMutation

  } = adminApi;
  export default adminApi;