import request from '@/utils/request'
    
// 股票列表
export const getStockList = (params: any) => request.get('/api/company/', { params })
