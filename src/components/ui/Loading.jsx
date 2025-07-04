import { motion } from 'framer-motion'

const Loading = ({ type = 'cards' }) => {
  const CardSkeleton = () => (
    <div className="card-gradient rounded-lg p-6 border border-slate-800 shimmer-overlay">
      <div className="space-y-4">
        <div className="w-full h-48 bg-slate-800 rounded-lg animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-6 bg-slate-800 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded animate-pulse w-1/2"></div>
          <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-800 rounded animate-pulse w-1/4"></div>
          <div className="h-8 bg-slate-800 rounded animate-pulse w-20"></div>
        </div>
      </div>
    </div>
  )

  const PostSkeleton = () => (
    <div className="card-gradient rounded-lg p-6 border border-slate-800 shimmer-overlay">
      <div className="space-y-4">
        <div className="w-full h-64 bg-slate-800 rounded-lg animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-8 bg-slate-800 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded animate-pulse w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-slate-800 rounded animate-pulse w-4/5"></div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="h-6 bg-slate-800 rounded animate-pulse w-16"></div>
            <div className="h-6 bg-slate-800 rounded animate-pulse w-20"></div>
          </div>
          <div className="h-4 bg-slate-800 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  )

  const HeroSkeleton = () => (
    <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
        <div className="h-12 bg-slate-800 rounded animate-pulse w-2/3"></div>
        <div className="h-6 bg-slate-800 rounded animate-pulse w-1/2"></div>
        <div className="h-12 bg-slate-800 rounded animate-pulse w-32"></div>
      </div>
    </div>
  )

  const renderSkeletons = () => {
    switch (type) {
      case 'hero':
        return <HeroSkeleton />
      case 'posts':
        return (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        )
      case 'cards':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {renderSkeletons()}
    </motion.div>
  )
}

export default Loading