/* Inject */
import Image from 'next/image';
import { ProjectItem } from '../../types/type';
export default function ProjectCard(props: ProjectItem) {
    const { name, description, id, avatar, apiCount, type } = props;
    return (
        <div className="relative mb-4 flex w-full max-w-[26rem] select-none flex-col  rounded-xl bg-white bg-clip-border text-gray-700 shadow-none hover:scale-125 hover:shadow-xl  hover:blur-none  hover:transition-all  active:border-2 active:border-solid active:border-violet-300  dark:bg-gray-500">
            <div className="relative mx-8 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pb-8 pt-0 text-gray-700 shadow-none">
                <Image
                    src={avatar ? avatar : 'https://via.placeholder.com/50'}
                    alt={`avatar of ${name}`}
                    width={50}
                    height={50}
                    className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <h5 className="text-blue-gray-900 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                            {name}
                        </h5>
                        <h3>项目接口总数：{apiCount}</h3>
                    </div>
                    <p className="text-blue-gray-900 block font-sans text-base font-light leading-relaxed antialiased">
                        {type === 0 ? '个人项目' : '团队项目'}
                    </p>
                </div>
            </div>
            <div className="mb-6 ml-8">
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {description ? description : '暂无描述'}
                </p>
            </div>
        </div>
    );
}
